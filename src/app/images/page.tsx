import Image from "next/image"
import Typography from "@/components/Typography"
import Layout from "@/components/Layout"
import style from "./_.module.css"
import { pictures } from "@/constant/pictures.items"

export default function Images() {
    return (
        <Layout>
            <Typography variant="h2" weight="semibold">Images</Typography>
            <Typography variant="h6" color="darkgray">
                See our beutiful images
            </Typography>
            <section className={style.imageList}>
                {pictures? pictures.map((pic: string, idx: number) =>(
                    <Image
                        key={idx} 
                        src={pic} 
                        alt={`pictures-${idx+1}`} 
                        quality={75} 
                        width={300} 
                        height={200}
                        loading="eager"
                        className={style.image}
                    />
                )): (
                    <Typography>Sorry, data not found</Typography>
                )}
            </section>
        </Layout>

    )
}