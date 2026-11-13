"use client";

import SemesterBranchClient from "../SemesterBranchClient.js";
import { config, badgeCss } from "./Sem3_CIVIL.config";

export default function Sem3_CIVILClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
