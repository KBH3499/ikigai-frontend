import React from "react";

const ComicBlankLeft = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="flip_page_padding">
        <div
          className="page_content"
          style={{ height: "90%", display: "block", justifyContent: "center" }}
        >
          <div style={{ height: "100%", overflowY: "auto" }}>
            <h1
              className="SamuraiBlast gallery_title"
              style={{ textAlign: "center" }}
            >
              ikigai Story
            </h1>
            <p
              className="ikigai_story"
              style={{
                height: "80%",
                textAlign: "start",
              }}
            >
              Each day Iki woke up 💤. He was an average employee. Working a
              standard 9-5. Although many times his 9-5 would consist of
              overtime, long hours, extra work and many more mundane tasks that
              typically got handed off to him. But it wasn't the worst. He was
              living comfortably, at least he believed. <br /> <br />
              Iki woke up and went to work 💼 as usual one day. After working
              overtime till about 9PM he left the office. It was dark, he was
              reminiscing and just thinking about his name. Ikigai. 'Reason for
              being'. He contemplated where was his reason? What was his
              purpose. <br /> <br />
              Suddenly, to his surprise, a woman🙍‍♀️ shrieks for help. Iki heads
              toward the thugs assaulting the woman. He shouts 🗣 and barges into
              them, creating an opening for the woman. RUN! he dashes away,
              being chased. Stop... Sweat drips down his face as he's backed
              against a wall wall. Nowhere to go. <br /> <br />
              The man approached. Stab! 🔪 Iki felt the world around him
              spiralling. He fell to the ground, gasping for air. Doing whatever
              he could to cling on to what little life the man had left.
              <br /> <br /> Blood oozed from his chest as the knife dug deep
              inside. Iki died. <br /> <br />
              But this isn't the end of Iki's journey. <br /> <br />
              The story continues...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComicBlankLeft;
