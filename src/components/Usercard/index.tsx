"use client"
import { FaUserAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import styles from "./_.module.css";
import { redirect } from "next/navigation";
import { User } from "@/types/index"
import Card from "@/components/ui/card"

export default function Usercard({
    data,
    mode = "default"
}: {
    data: User
    mode?: "detail" | "default"
}) {
    const id = data.id
    const name = data.name
    const username = data.username
    const website = data.website
    const city = data.address.city
    const companyName = data.company.name

    return (
        <Card
            className={`${styles.card}`}
            onClick={()=> redirect(`/users/${id}`)}
            icon={FaUserAlt}
            mode={mode}
        >   
            <div className={styles.content}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.username}>@{username}</p>
                
                <div className={styles.infoRow}>
                    <IoLocationSharp className={styles.infoIcon} />
                    {mode == "detail" ? (
                        <>
                            <span className={styles.infoText}>{data.address.suite},</span>
                            <span className={styles.infoText}>{data.address.street},</span>
                            <span className={styles.infoText}>{city},</span>
                            <span className={styles.infoText}>Zip. {data.address.zipcode},</span>
                            <span className={styles.infoText}>Lat. {data.address.geo.lat}</span>
                            <span className={styles.infoText}>lng. {data.address.geo.lng}</span>
                        
                        </>
                    ): (
                        <span className={styles.infoText}>{city}</span>
                    )}
                </div>
                
                <div className={styles.details}>
                    <div className={styles.company}>
                        <span className={styles.label}>Company</span>
                        <span className={styles.value} title={companyName}>{companyName}</span>
                    </div>
                    <div className={styles.social}>
                        <span className={styles.label}>Social Media</span>
                        <a href={`https://${website}`}>
                            <TbWorld size={20}/>    
                        </a>
                    </div>
                    {mode == "detail" && (
                        <>
                            <div className={styles.phone}>
                                <span className={styles.label}>Phone</span>
                                <span className={styles.value}>{data.phone}</span>
                            </div>
                            <div className={styles.email}>
                                <span className={styles.label}>Email</span>
                                <span className={styles.value}>{data.email}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
}