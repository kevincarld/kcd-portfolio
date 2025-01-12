"use client";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import {
  KcdPortfolioEntity,
  KcdPortfolioEntityResponseCollection,
} from "@/lib/strapi/types";
import { Skeleton } from "../../ui/skeleton";

export default function Pagination({
  rank,
  containerClass,
}: {
  rank: number | null;
  containerClass?: string;
}) {
  if (typeof rank !== "number") return null;
  const GET_PREV_NEXT = gql`
    query ($filters: KcdPortfolioFiltersInput) {
      kcdPortfolios(
        sort: "rank:asc"
        filters: $filters
        pagination: { limit: 2 }
      ) {
        data {
          attributes {
            slug
            rank
          }
        }
      }
    }
  `;
  const [projects, setProjects] = React.useState<KcdPortfolioEntity[] | null>(
    null
  );

  const { data, loading } = useQuery<{
    kcdPortfolios: KcdPortfolioEntityResponseCollection;
  }>(GET_PREV_NEXT, {
    variables: {
      filters: {
        or: [
          {
            rank: {
              eq: rank - 1,
            },
          },
          {
            rank: {
              eq: rank + 1,
            },
          },
        ],
      },
    },
    onCompleted: (data) => {
      setProjects(data.kcdPortfolios.data);
    },
  });

  return (
    <div className={containerClass}>
      {loading ? (
        <>
          <Skeleton className="w-[80px] h-[40px]" />
          <Skeleton className="w-[80px] h-[40px]" />
        </>
      ) : data ? (
        <>
          {projects?.map((proj, index) => {
            const currentRank = proj?.attributes?.rank;
            const slug = proj?.attributes?.slug;
            if (typeof currentRank !== "number") return null;

            if (!slug) return null;

            if (currentRank < rank) {
              return (
                <Link href={`/portfolio/${slug}`} key={index}>
                  <Button variant="outline">Previous</Button>
                </Link>
              );
            }

            if (currentRank > rank) {
              return (
                <Link href={`/portfolio/${slug}`} key={index}>
                  <Button variant="default">Next</Button>
                </Link>
              );
            }
          })}
        </>
      ) : null}
    </div>
  );
}
