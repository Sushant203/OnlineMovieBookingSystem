import React from "react";
import NowShowing from "./NowShowing";
import NextRelease from "./NextRelease";

type Props = {};

export default function index({}: Props) {
  return (
    <main className="container">
      <section>
        <h1 className="font-bold text-2xl">Now-Showing</h1>
        <hr />
        <NowShowing />
      </section>
      <section>
        <h1 className="font-bold text-2xl">Next-Release</h1>
        <hr />
        <NextRelease />
      </section>
    </main>
  );
}
