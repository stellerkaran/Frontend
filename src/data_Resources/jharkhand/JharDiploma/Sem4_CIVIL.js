"use client";

import SemesterBranchClient from "./SemesterBranchClient.js";
import { config, badgeCss } from "./Sem4_CIVIL.config";

export default function Sem4_CIVILClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
