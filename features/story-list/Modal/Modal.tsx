"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MUIModal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./Modal.module.css";
import { IStory } from "../types";
const modalContainerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
  p: 3,
  outline: "none",
};

interface IModalTypes {
  isOpen: boolean;
  onClose: () => void;
  story: IStory;
}

const timeSlide = 500;
const speedSlide = 5;

export default function StoryModal({ isOpen, onClose, story }: IModalTypes) {
  const [progress, setProgress] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const currentSlide = story.slides[slideIndex];
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + speedSlide, 100));
    }, timeSlide);

    const timer = setTimeout(
      () => {
        if (slideIndex < story.slides.length - 1) {
          setProgress(0);
          setSlideIndex(slideIndex + 1);
        } else {
          onClose();
        }
      },
      timeSlide * (100 / speedSlide),
    );
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isOpen, story.id, slideIndex]);
  return (
    <MUIModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="story-modal-title"
      closeAfterTransition
    >
      <Box sx={modalContainerStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "text.secondary",
          }}
        >
          &times;
        </IconButton>

        <Box sx={{ mb: 2, pr: 4 }}>
          <Typography
            id="story-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 1, fontWeight: "bold" }}
          >
            {story.title}
          </Typography>
          <div className={styles.progressBars}>
            {story.slides.map((stories, index) => (
              <div key={stories.id} className={styles.progressBar}>
                <LinearProgress
                  variant="determinate"
                  sx={{ height: 6, borderRadius: 3 }}
                  value={
                    index < slideIndex
                      ? 100
                      : index === slideIndex
                        ? progress
                        : 0
                  }
                />
              </div>
            ))}
          </div>
        </Box>

        <div className={styles.imageWrapper}>
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.text}
            className={styles.image}
          />
        </div>
      </Box>
    </MUIModal>
  );
}
