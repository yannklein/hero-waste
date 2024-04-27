import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { BatchCategory } from "@prisma/client";

export type BatchProps = {
  id: string;
  name: string;
  size: Number;
  startDate: Date;
  endDate: Date;
  category: BatchCategory;
  createdAt: Date;
  updatedAt: Date;
};

const Batch: React.FC<{ batch: BatchProps }> = ({ batch }) => {
  return (
    <div onClick={() => Router.push("/batches/[id]", `/batches/${batch.id}`)}>
      <h2>{batch.name}</h2>
      <small>Grouping {batch.size} {batch.category.toLowerCase()} students</small>
    </div>
  );
};

export default Batch;
