"use client";

import SemesterBranchClient from "./SemesterBranchClient.js";
import { config, badgeCss } from "./Sem4_CSE.config";

export default function Sem4_CSEClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
