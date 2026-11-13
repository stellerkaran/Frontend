"use client";

import SemesterBranchClient from "./SemesterBranchClient.js";
import { config, badgeCss } from "./Sem4_ECE.config";

export default function Sem4_ECEClient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: badgeCss }} />
      <SemesterBranchClient config={config} />
    </>
  );
}
