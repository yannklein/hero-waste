import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { BatchCategory, Disposal } from "@prisma/client";

export type BatchProps = {
  id: string;
  name: string;
  size: Number;
  score: Number;
  lastWeekDisposals: Number;
  disposals: Disposal[];
  startDate: Date;
  endDate: Date;
  category: BatchCategory;
  createdAt: Date;
  updatedAt: Date;
};

const Batch: React.FC<{ batch: BatchProps }> = ({ batch }) => {
  console.log(batch.score);
  
  return (
    <div onClick={() => Router.push("/batches/[id]", `/batches/${batch.id}`)}>
      <h2>{batch.name}</h2>
      <small>Grouping {batch.size} {batch.category.toLowerCase()} students</small>
      <p>Score: {batch.score}</p>
      <p>Amount of disposal: {batch.disposals.length}</p>
      <p>Last week disposal: {batch.lastWeekDisposals}</p>
    </div>
  );
};

export default Batch;
