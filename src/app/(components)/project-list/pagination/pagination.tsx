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
  rank: number;
  containerClass?: string;
}) {
  const GET_PREV_NEXT = gql`
    query ($filters: KcdPortfolioFiltersInput) {
      kcdPortfolios(filters: $filters, pagination: { limit: 2 }) {
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
          {projects?.map((proj) => {
            const currentRank = proj?.attributes?.rank;
            const slug = proj?.attributes?.slug;

            if (!currentRank || !slug) return null;

            if (currentRank < rank) {
              return (
                <Link href={`/portfolio/${slug}`}>
                  <Button variant="outline">Previous</Button>
                </Link>
              );
            }

            if (currentRank > rank) {
              return (
                <Link href={`/portfolio/${slug}`}>
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
