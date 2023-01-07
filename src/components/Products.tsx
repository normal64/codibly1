import React, { useEffect, useState } from "react";
import { store } from "../index";
import { z } from "zod"
import codibly from "../apis/codibly";
import { Pagination, List, Input } from "semantic-ui-react";
import renderList from "../helper-functions/renderList";
import { setFilterValue } from "../actions";
import responseSchema from "../schemas/responseSchema"

const Products = (props: any) => {
  const [response, setResponse] = useState();
  const [filter, setFilter] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState();
  const [responseForPagination, setResponseForPagination] = useState();
  const [totalPages, setTotalPages] = useState<typeof freeType>()
  let freeType: number;
  const getData = async () => {
    
    const res = await codibly.get("", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });
    
    if (responseSchema.safeParse(res.data).success) {
      console.log("validation passed");

      setResponse(res.data);
      setTotalItems(res.data.total);
      prepareForPagination(res.data, pageSize, page);
      setTotalPages(res.data.total_pages)
    } else console.log("Error validating API response ")


  };

  const prepareForPagination = (response: any, pageSize: any, page: any) => {
    let start = Number((page - 1) * pageSize + 1);
    let end = start - 1 + pageSize;
    let niceResponse = response.data.filter((elem: any) => {
      if (elem.id >= start && elem.id <= end) {
        return elem;
      }
    });
    setResponseForPagination(niceResponse);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFormChange = (e: any) => {
    if (isNaN(e.target.value) == true) {
      return;
    }
    if (e.target.value == "") {
      setFilter(e.target.value);
      return;
    }
    setFilter(e.target.value);
    store.dispatch(setFilterValue(e.target.value));
  };

  return (
    <div className="ui container center aligned">
      {response ? (
        <div>
          <Input
            value={filter || ""}
            onChange={(e) => {
              onFormChange(e);
            }}
            focus
            placeholder="Type an ID to filter results"
          />
          <List>
            {responseForPagination
              ? renderList(responseForPagination, filter)
              : "Loading.."}
          </List>
          <Pagination
            defaultActivePage={page}
            // totalPages={response.total_pages}
            totalPages={totalPages ? totalPages : 1}
            onPageChange={(event, data) => {
              // setPage(data.activePage)
              prepareForPagination(response, pageSize, data.activePage);
            }}
          />
        </div>
      ) : (
        "loading.."
      )}
    </div>
  );
};

export default Products;
