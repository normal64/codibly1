import { z } from "zod"
const responseSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        year: z.number(),
        color: z.string(),
        pantone_value: z.string()
      }
      )
    )
  })
  export default responseSchema