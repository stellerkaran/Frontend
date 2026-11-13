"use client";

import GateCSSubjectsClient from "./GateCSSubjectsClient";
import { GATE_EE_SUBJECTS } from "@/src/data_Exam/Gate/GateEEData";

export default function GateEESubjectsClient() {
  return (
    <GateCSSubjectsClient
      subjects={GATE_EE_SUBJECTS}
      streamLabel="GATE Electrical Engineering"
      routePrefix="electrical-engineering"
      coreFilterLabel="Core EE (7+ M)"
      questionBankLabel="Subject-wise practice"
      isEEGrid={true}
    />
  );
}
