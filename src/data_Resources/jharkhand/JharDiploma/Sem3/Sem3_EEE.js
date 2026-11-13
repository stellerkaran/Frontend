"use client";

import SemesterBranchClient from "../SemesterBranchClient.js";
import { config, badgeCss } from "./Sem3_EEE.config";

export default function Sem3_EEEClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
