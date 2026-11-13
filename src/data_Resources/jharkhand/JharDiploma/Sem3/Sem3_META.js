"use client";

import SemesterBranchClient from "../SemesterBranchClient.js";
import { config, badgeCss } from "./Sem3_META.config";

export default function Sem3_METAClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
