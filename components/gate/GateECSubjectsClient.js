"use client";

import GateCSSubjectsClient from "./GateCSSubjectsClient";
import { GATE_EC_SUBJECTS } from "@/src/data_Exam/Gate/GateECData";

export default function GateECSubjectsClient() {
  return (
    <GateCSSubjectsClient
      subjects={GATE_EC_SUBJECTS}
      streamLabel="GATE Electronics & Communication"
      routePrefix="electronics-communication"
      coreFilterLabel="Core EC (7+ M)"
      questionBankLabel="Subject-wise practice"
      isTwoColumnGrid={true}
    />
  );
}
