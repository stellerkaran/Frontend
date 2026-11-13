"use client";

import SemesterBranchClient from "../SemesterBranchClient.js";
import { config, badgeCss } from "./Sem3_ECE.config";

export default function Sem3_ECEClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
