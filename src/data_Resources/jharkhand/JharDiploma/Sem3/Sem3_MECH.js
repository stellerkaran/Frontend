"use client";

import SemesterBranchClient from "../SemesterBranchClient.js";
import { config, badgeCss } from "./Sem3_MECH.config";

export default function Sem3_MECHClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
