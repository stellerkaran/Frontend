"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";
import "./ExamPickerModal.css";
import { authFetch } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import {
    EXAM_STORAGE_KEY,
    EXAM_GROUPS,
    ALL_EXAMS,
    normalizeExamId,
    getSavedExam,
    getExamHomePath,
} from "../../utils/examData";

// Exam catalogue + selection helpers live in utils/examData so server
// components (e.g. /exam-preparation's pre-paint Bihar redirect) can use
// the exact same data. Re-exported here for existing consumers.
export {
    EXAM_STORAGE_KEY,
    EXAM_GROUPS,
    normalizeExamId,
    getSavedExam,
    BIHAR_EXAM_IDS,
    isBiharExam,
    BIHAR_EXAM_HOME,
    getExamHomePath,
} from "../../utils/examData";

// `required` prevents dismissing the picker during first-time onboarding.
// `redirectOnContinue` can be false when an authenticated user changes exam
// from the dashboard and should remain on the current page.
export default function ExamPickerModal({
    show,
    onClose,
    required = false,
    redirectOnContinue = true,
}) {
    const router = useRouter();
    const { user, updateUser } = useAuth();
    const [selected, setSelected] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Preselect the server value, falling back to a previous device preference.
    useEffect(() => {
        if (!show) return;
        setSelected(normalizeExamId(user?.exam) || (required ? "" : getSavedExam()));
        setError("");
        setSaving(false);
    }, [show, user?.exam, required]);

    const chosen = ALL_EXAMS.find((exam) => exam.id === selected);

    const handleContinue = async () => {
        if (!chosen || saving) return;

        setSaving(true);
        setError("");

        try {
            const res = await authFetch("/auth/exam", {
                method: "PATCH",
                body: JSON.stringify({ exam: chosen.id }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || data.error || "Could not save your exam. Please try again.");
            }

            const savedExam = data.exam || chosen.id;
            try {
                localStorage.setItem(EXAM_STORAGE_KEY, savedExam);
            } catch {
                // Storage blocked, continue because the server value was saved.
            }
            updateUser({ exam: savedExam });
            onClose();

            if (redirectOnContinue) {
                router.push(`${getExamHomePath(chosen)}?exam=${savedExam}`);
            }
        } catch (err) {
            setError(err.message || "Could not save your exam. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={required ? () => {} : onClose}
            keyboard={!required}
            closeButton={!required}
            backdrop="static"
            className="exam-modal"
            dialogClassName="exam-modal-dialog"
            contentClassName="exam-modal-content"
            aria-labelledby="exam-modal-title"
        >
            <div className="exam-head">
                <h3 className="exam-title" id="exam-modal-title">Choose your exam</h3>
                <p className="exam-subtitle">
                    We'll set up your practice questions and updates for it. You can change this later.
                </p>
            </div>

            <Modal.Body className="exam-body">
                {EXAM_GROUPS.map((group) => (
                    <section className="exam-group" key={group.key}>
                        <h4 className="exam-group-title">{group.title}</h4>
                        <div className="exam-grid">
                            {group.exams.map((exam) => {
                                const active = exam.id === selected;
                                return (
                                    <button
                                        key={exam.id}
                                        type="button"
                                        aria-pressed={active}
                                        disabled={saving}
                                        className={`exam-option ${active ? "exam-option--active" : ""}`}
                                        onClick={() => setSelected(exam.id)}
                                    >
                                        <span className={`exam-mono exam-mono--${exam.tone}`} aria-hidden="true">
                                            {exam.mono}
                                        </span>
                                        <span className="exam-option-text">
                                            <span className="exam-option-name">{exam.name}</span>
                                            <span className="exam-option-state">{exam.state}</span>
                                        </span>
                                        <span className="exam-check" aria-hidden="true">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </Modal.Body>

            {error && (
                <p className="exam-error" role="alert">{error}</p>
            )}

            <div className="exam-foot">
                <span className="exam-required-note">
                    {required ? "Required to continue" : "You can change this anytime"}
                </span>
                <button
                    type="button"
                    className="exam-continue"
                    disabled={!chosen || saving}
                    aria-busy={saving}
                    onClick={handleContinue}
                >
                    {saving ? "Saving..." : chosen ? "Continue" : "Choose an exam"}
                </button>
            </div>
        </Modal>
    );
}