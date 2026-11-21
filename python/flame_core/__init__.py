"""Shared Python core for Flame Connect (website API, tools and services)."""

from .assessment import score_assessment, AssessmentError

__all__ = ["score_assessment", "AssessmentError"]
__version__ = "0.1.0"
