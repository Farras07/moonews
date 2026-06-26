import style from "./_.module.css"
import Card from "@/components/ui/card"
import { FaRegNewspaper } from "react-icons/fa6";
import { Article } from "@/types";
import Typography from "../Typography";

export default function ArticleCard ({
    data
}: {
    data: Article
}) {
    
    const author = data.author
    const title = data.title
    const body = data.body

    const shortenedTitle = title.length > 30? `${title.slice(0,29)}...`: title
    const shortenedBody = body.length > 50? `${body.slice(0,49)}...`: body
    
    return (
        <Card 
            icon={FaRegNewspaper}
            mode="detail"
        >
            <section className={`${style.articleDetail}`}>
                <Typography variant="btn" color="gray">Author: {author}</Typography>
                <Typography variant="t" weight="medium">{shortenedTitle}</Typography>
            </section>
            <section className={`${style.bodyNews}`}>
                <Typography variant="p" color="darkgray">{shortenedBody}</Typography>
            </section>
        </Card>
    )
}