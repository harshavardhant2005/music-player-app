import Logo from "./Logo"
import Menu from "./Menu"

let NavbarContainer = ()=>{
    return <section className="bg-slate-700  h-[70px] w-[100%] ">

        <article className=" h-[100%] w-[95%] m-auto  flex items-center justify-between">
        <Logo/>
        <Menu/>
        </article>
    </section>
} 
export default NavbarContainer 