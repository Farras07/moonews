"use client"
import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import { useState } from "react"
import style from "./_.module.css"

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function FormPage() {
    const [name, setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [pass,setPass] = useState<string>("")

    const [result, setResult] = useState<FormData | null>(null);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResult({
            name,
            email,
            password: pass,
        });
    }

    return (
        <Layout>
            <div className={style.container}>
                <form onSubmit={submitForm} className={style.form}>
                    <div className={style.field}>
                        <label htmlFor="name" className={style.label}>
                        <Typography>Nama</Typography>
                        </label>
                        <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className={style.inputText}
                        />
                    </div>

                    <div className={style.field}>
                        <label htmlFor="email" className={style.label}>
                        <Typography>Email</Typography>
                        </label>
                        <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.inputText}
                        />
                    </div>

                    <div className={style.field}>
                        <label htmlFor="password" className={style.label}>
                        <Typography>Password</Typography>
                        </label>
                        <input
                        type="password"
                        id="password"
                        onChange={(e) => setPass(e.target.value)}
                        className={style.inputText}
                        />
                    </div>

                    <button type="submit" className={`${style.button}`}>
                        <Typography variant="btn" weight="semibold">Submit</Typography>
                    </button>
                </form>

                <section className={style.result}>
                    {result && (
                        <>
                            <Typography variant="h6" weight="semibold">
                                Result
                            </Typography>
                            <div>
                                <Typography>
                                    <strong>Name:</strong> {result.name}
                                </Typography>

                                <Typography>
                                    <strong>Email:</strong> {result.email}
                                </Typography>

                                <Typography>
                                    <strong>Password:</strong> {result.password}
                                </Typography>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </Layout>
    )
} 