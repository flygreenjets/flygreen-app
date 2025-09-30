import {StageOrder, StatusOrder, TripStage, TripStatus} from "@/types/trips";

export function compareStatus(a: TripStatus, b: TripStatus) {
    return StatusOrder[a] - StatusOrder[b];
}


// Status comparison helpers
export function statusIsAfter(a: TripStatus, b: TripStatus) {
    return compareStatus(a, b) > 0;
}

export function statusIsBefore(a: TripStatus, b: TripStatus) {
    return compareStatus(a, b) < 0;
}

export function statusIsAtLeast(a: TripStatus, b: TripStatus) {
    return compareStatus(a, b) >= 0;
}

// Stage comparison helpers
export function compareStage(a: TripStage, b: TripStage) {
    return StageOrder[a] - StageOrder[b];
}

export function stageIsAfter(a: TripStage, b: TripStage) {
    return compareStage(a, b) > 0;
}

export function stageIsBefore(a: TripStage, b: TripStage) {
    return compareStage(a, b) < 0;
}

export function stageIsAtLeast(a: TripStage, b: TripStage) {
    return compareStage(a, b) >= 0;
}
