"use client";

import SemesterBranchClient from "./SemesterBranchClient.js";
import { config, badgeCss } from "./Sem4_EEE.config";

export default function Sem4_EEEClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
