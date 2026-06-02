"use client";
import { useState } from "react";
import { StoryImages } from "./mock";
import styles from "./StoryList.module.css";
import Modal from "./Modal/Modal";

export default function StoryList() {
  const [selectedStory, setSelectedStory] = useState<
    null | (typeof StoryImages)[0]
  >(null);

  function handleModalOpen(story: (typeof StoryImages)[0]) {
    setSelectedStory(story);
  }

  function handleModalClose() {
    setSelectedStory(null);
  }
  return (
    <div className={styles.container}>
      {StoryImages.map((img) => (
        <div
          key={img.id}
          className={styles.storyCard}
          onClick={() => handleModalOpen(img)}
        >
          <img src={img.url} alt={img.alt} className={styles.image} />
          <div className={styles.overlay} />
        </div>
      ))}
      {selectedStory && (
        <Modal
          isOpen={!!selectedStory}
          onClose={handleModalClose}
          imgUrl={selectedStory?.url}
          imgAlt={selectedStory?.alt}
          storyId={selectedStory?.id}
        />
      )}
    </div>
  );
}
