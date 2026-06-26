import Navbar from "../Navbar"
import style from "./_.module.css"

export default function Layout({
    children
}:{
    children: React.ReactNode
}) {
    return (
        <main className={`${style.container}`}>
            <Navbar webName="Moonews"/>
            <div className={`${style.contentWrapper}`}>
                {children}
            </div>
        </main>
    )
}