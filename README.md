# Structure Composer
*Advanced Studio — Class 8*

In this repo is a working hand pose detection script. Build a two-phase system on top of it.

**Phase 1: Recording (exactly 10 seconds)**
The webcam runs. Hand keypoints are visible on the canvas. Keypoint data is collected into an array every frame. Recording stops automatically after 10 seconds.

**Phase 2: Rendering**
The webcam feed and hand visuals are gone. The recorded array is now the source data for a generative artwork. Map the recorded data array onto the canvas.

You are welcome to copy an existing generative drawing sketch from online if that helps you focus on the data translation phase.

## Constraints

1. A button press starts the recording
2. Recording stops automatically at 10 seconds. include a simple visible countdown timer
3. Hands are visible during recording, completely absent during rendering and artwork ouput
4. The same gestures should produce a recognisably similar result
5. Write a comment block at the top of your sketch describing in plain English what the hands control and why

## Questions to consider

- What is worth recording? 21 keypoints every frame is a lot of data. What does your system actually need?
   - consider only rendering the keypoints you are actually recording. this will likely help the player understand the system too
   - if labelling your datapoints is useful, consider storing frames as JS objects rather than plain arrays
- What does a hand do over 10 seconds that is interesting: position, speed, shape, rhythm?
- Is the relationship between gesture and output something a viewer could figure out, or is it intentionally hidden?

## If you finish early:
- Use the p5.capture library to add a button that downloads the resulting image or animation as an image or gif
- check out the ml5 library for other computer vision techniques
- check out the handsfree.js library too 