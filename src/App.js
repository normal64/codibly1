import Products from "./components/Products";
import Header from "./components/Header"



const App = () => {
    document.body.style = 'background-image: linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% );';
    
    return (
        <div>
            <Header />
            <Products />
        </div>
    )
}

export default App
