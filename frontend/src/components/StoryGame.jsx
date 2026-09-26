import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function StoryGame({ story, theme = "default", onNewStory }) {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [options, setOptions] = useState([]);
  const [isEnding, setIsEnding] = useState(false);
  const [isWinningEnding, setIsWinningEnding] = useState(false);
  const nodeRef = useRef(null);

  // Set root node
  useEffect(() => {
    if (story && story.root_node) {
      setCurrentNodeId(story.root_node.id);
    }
  }, [story]);

  // Update current node
  useEffect(() => {
    if (currentNodeId && story && story.all_nodes) {
      const node = story.all_nodes[currentNodeId];
      setCurrentNode(node);
      setIsEnding(node.is_ending);
      setIsWinningEnding(node.is_wining_ending);

      if (!node.is_ending && node.options && node.options.length > 0) {
        setOptions(node.options);
      } else {
        setOptions([]);
      }
    }
  }, [currentNodeId, story]);

  // Animate the story text on every node change
  useGSAP(() => {
    if (!nodeRef.current) return;

    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );

    const buttons = nodeRef.current.querySelectorAll(".option-btn");
    if (buttons.length) {
      gsap.fromTo(
        buttons,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }
      );
    }
  }, { dependencies: [currentNodeId], scope: nodeRef });

  const chooseOption = (id) => setCurrentNodeId(id);
  const restartStory = () => {
    if (story && story.root_node) setCurrentNodeId(story.root_node.id);
  };

  return (
    <div className="story-game">
      <header className="story-header">
        <h2>{story.title}</h2>
      </header>

      <div className="story-content">
        {currentNode && (
          <div className="story-node" ref={nodeRef}>
            <p>{currentNode.content}</p>

            {isEnding ? (
              <div className="story-ending">
                <h3>{isWinningEnding ? "Congratulations" : "The End"}</h3>
                <p>
                  {isWinningEnding
                    ? "You reached a winning ending"
                    : "Your adventure has ended."}
                </p>
              </div>
            ) : (
              <div className="story-options">
                <h3>What will you do?</h3>
                <div className="options-list">
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => chooseOption(opt.node_id)}
                      className="option-btn"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="story-controls">
          <button onClick={restartStory} className="reset-btn">
            Restart Story
          </button>
          {onNewStory && (
            <button onClick={onNewStory} className="new-story-btn">
              New Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryGame;