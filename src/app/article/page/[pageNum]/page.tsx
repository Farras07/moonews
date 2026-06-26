import Link from "next/link";

import Layout from "@/components/Layout";
import Typography from "@/components/Typography";
import ArticleCard from "@/components/Articlecard";

import { Article, User } from "@/types";

import style from "./_.module.css";

export const dynamic = "force-static";

const ITEMS_PER_PAGE = 6;

export async function generateStaticParams() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const articles: Article[] = await res.json();

  const totalPages = Math.ceil(
    articles.length / ITEMS_PER_PAGE
  );

  return Array.from(
    { length: totalPages },
    (_, i) => ({
      page: String(i + 1),
    })
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ pageNum: string }>;
}) {
  const { pageNum } = await params;

  const currentPage = Number(pageNum);

  const [articleRes, userRes] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ]);

  const articles: Article[] = await articleRes.json();
  const users: User[] = await userRes.json();

  const userMap = new Map(
    users.map((user) => [user.id, user.name])
  );

  const totalPages = Math.ceil(
    articles.length / ITEMS_PER_PAGE
  );

  const validPage = Math.min(
    Math.max(currentPage, 1),
    totalPages
  );

  const startIndex =
    (validPage - 1) * ITEMS_PER_PAGE;

  const displayedArticles = articles
    .slice(startIndex, startIndex + ITEMS_PER_PAGE)
    .map((article) => ({
      ...article,
      author: userMap.get(article.userId) ?? "Unknown Author",
  }));



  return (
    <Layout>
      <Typography variant="h2">
        Article
      </Typography>

      <Typography variant="h6" color="darkgray">
        Stay updated, read our interesting article
      </Typography>

      <section className={style.listArticle}>
        {displayedArticles.length > 0 ? (
          displayedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              data={article}
            />
          ))
        ) : (
          <Typography>
            Sorry, Data not Found
          </Typography>
        )}
      </section>

      <div className={style.pagination}>
        {validPage > 1 && (
          <Link
            href={`/article/page/${validPage - 1}`}
            className={style.pageButton}
          >
            Previous
          </Link>
        )}

        {Array.from(
          { length: totalPages },
          (_, i) => i + 1
        ).map((pageNum) => {
          if (
            pageNum === 1 ||
            pageNum === totalPages ||
            Math.abs(pageNum - validPage) <= 2
          ) {
            return (
              <Link
                key={pageNum}
                href={`/article/page/${pageNum}`}
                className={`${style.pageButton} ${
                  pageNum === validPage
                    ? style.activePage
                    : ""
                }`}
              >
                {pageNum}
              </Link>
            );
          }

          if (
            pageNum === validPage - 3 ||
            pageNum === validPage + 3
          ) {
            return (
              <span
                key={pageNum}
                className={style.ellipsis}
              >
                ...
              </span>
            );
          }

          return null;
        })}

        {validPage < totalPages && (
          <Link
            href={`/article/page/${validPage + 1}`}
            className={style.pageButton}
          >
            Next
          </Link>
        )}
      </div>
    </Layout>
  );
}