import style from "@/app/Home.module.css";
import Typography from "@/components/Typography";
import Usercard from "@/components/Usercard";
import { User } from "@/types/index"
import Layout from "@/components/Layout";
import Link from "next/link";

export default async function Home(props: {
  searchParams: Promise<{ page?: string }>
}) {
  const searchParams = await props.searchParams;
  const currentPage = parseInt(searchParams.page || "1", 10) || 1;

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  const itemsPerPage = 6;
  const totalUsers = users ? users.length : 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  const page = Math.max(1, Math.min(currentPage, totalPages || 1));
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = users ? users.slice(startIndex, endIndex) : [];

  return (
    <Layout>
      <Typography variant="h2">
        Our Users
      </Typography>
      <Typography variant="h6" color="darkgray">
        Discover profiles, locations, and details of our active users.
      </Typography>

      <section className={style.grid}>
        {displayedUsers && displayedUsers.length > 0 ? (
          displayedUsers.map((user: User) => (
            <Usercard
              key={user.id}
              data={user}
            />
          ))
        ) : (
          <Typography>Sorry, Data not Found</Typography>
        )}
      </section>

      {totalPages > 1 && (
        <div className={style.pagination}>
          {page > 1 && (
            <Link href={`/?page=${page - 1}`} className={style.pageButton}>
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              Math.abs(pageNum - page) <= 2
            ) {
              return (
                <Link
                  key={pageNum}
                  href={`/?page=${pageNum}`}
                  className={`${style.pageButton} ${
                    pageNum === page ? style.activePage : ""
                  }`}
                >
                  {pageNum}
                </Link>
              );
            } else if (
              pageNum === page - 3 ||
              pageNum === page + 3
            ) {
              return (
                <span key={pageNum} className={style.ellipsis}>
                  ...
                </span>
              );
            }
            return null;
          })}

          {page < totalPages && (
            <Link href={`/?page=${page + 1}`} className={style.pageButton}>
              Next
            </Link>
          )}
        </div>
      )}
    </Layout>
  );
}