"use client";
import {
  KcdPortfolioEntity,
  KcdPortfolioEntityResponseCollection,
} from "@/lib/strapi/types";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { slugifier } from "@/lib/utils";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const GET_PROJECTS = gql`
  query GET_PROJECTS($pagination: PaginationArg, $sort: [String]) {
    kcdPortfolios(pagination: $pagination, sort: $sort) {
      data {
        attributes {
          title
          stack
          category
          thumbnail {
            data {
              attributes {
                name
                alternativeText
                caption
                width
                height
                url
                previewUrl
              }
            }
          }
        }
      }
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;
export default function ProjectList() {
  const [projects, setProjects] = useState<KcdPortfolioEntity[] | []>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [init, setInit] = useState<boolean>(true);

  const pageSize = 4;
  const sort = "rank:asc";

  useEffect(() => {
    getMoreProjects({
      variables: {
        pagination: {
          page,
          pageSize,
        },
        sort,
      },
    });
    setInit(false);
  }, []);

  const [getMoreProjects, { loading: loadingMore }] = useLazyQuery<{
    kcdPortfolios: KcdPortfolioEntityResponseCollection;
  }>(GET_PROJECTS, {
    onCompleted: (data) => {
      setProjects([...projects, ...data.kcdPortfolios.data]);
      setPage((prev) => prev + 1);

      if (data.kcdPortfolios.meta.pagination.pageCount === page) {
        setHasMore(false);
      }
    },
  });

  const handleLoadMore = () => {
    getMoreProjects({
      variables: {
        pagination: {
          page,
          pageSize,
        },
        sort,
      },
    });
  };
  return (
    <section className="container py-10 md:py-14">
      <div className="container-sm px-0 mb-4 md:mb-8">
        <h2 className="text-lg text-black dark:text-white">Selected Works</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
        {init
          ? [1, 2, 3, 4].map((index) => (
              <div
                className={`${[1, 2].includes(index) ? "hidden md:block" : ""}`}
                key={index}
              >
                <Skeleton className="w-full h-[300px] rounded-2xl" />

                <div className="flex flex-col space-y-3 mt-4 px-6">
                  <Skeleton className="w-[50%] h-6" />
                  <Skeleton className="w-[30%] h-6" />
                </div>
              </div>
            ))
          : projects?.map(({ attributes: project }, index) => (
              <div key={index}>
                <Link href={`/portfolio/${slugifier(project?.title)}`}>
                  <figure>
                    <img
                      className="aspect-square object-top rounded-2xl w-full object-cover [clip-path:inset(3%_3%_3%_3%_round_1rem)] hover:[clip-path:inset(1%_1%_1%_1%_round_1rem)] transition-all duration-1000 ease-in-out"
                      src={project?.thumbnail?.data?.attributes?.url}
                      {...(project?.thumbnail?.data?.attributes?.width && {
                        width: project?.thumbnail?.data?.attributes?.width,
                      })}
                      {...(project?.thumbnail?.data?.attributes?.height && {
                        height: project?.thumbnail?.data?.attributes?.height,
                      })}
                      alt={`${project?.title} thumbnail`}
                    />
                  </figure>
                </Link>

                <div className="flex justify-between mt-3 px-6">
                  <div>
                    <h3 className="text-black dark:text-white text-lg capitalize">
                      {project?.title}
                    </h3>
                    <h4 className="capitalize text-sm">
                      {project?.category?.replaceAll("_", " ")}
                    </h4>
                    <p className="text-sm capitalize ">
                      Stack: {project?.stack?.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {hasMore && !init && (
        <div className="text-center mt-6 md:mt-10">
          <Button
            variant="default"
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
