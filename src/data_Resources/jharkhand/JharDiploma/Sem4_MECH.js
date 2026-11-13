"use client";

import SemesterBranchClient from "./SemesterBranchClient.js";
import { config, badgeCss } from "./Sem4_MECH.config";

export default function Sem4_MECHClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
