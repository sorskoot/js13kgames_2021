# js13kgames_2021
## Storage Space 13
---

### Story
You are a janitor on freight space ship, Storage Space 13. After flying through a meteor shower, the ship is a mess. 
Boxes are all over the place and vents are leaking.
You need to clean up the mess of boxes and place them onto the leaking vents in the floor.
The gravitiy system of the ship broken and is only working on your boots.
This means the boxes can only slide forward and only stop when hitting a wall or another box.     

### Controls
- Teleport or push box:  
    - Left mouse button (desktop)
    - Controller Trigger (VR)
- Menu:
    - Escape (desktop)
    - Controller X or A (VR)

### Notes
- If you get a box stuck in a corner, quickly restart the level through the menu.
- You can only teleport to places that are accessable, boxes can block the way.
- You need to be close to a box to push it.

## Play the game
You can play the game [here](https://ss13.sorskoot.com)


---

### Features in the game
- 13 challenging levels
- VR and desktop support
- teleporting around the level
- rotating with the controller
- moving boxes to different targets
- custom shader to render the textures and animating them using a few simple properties
- text on texture generator for buttons
- title screen
- very easy and quick restart of a level
- Gulp pipeline to build the level in development and for production
- sound fx
- some particle fx on the target

### Features that didn't make the cut
- More levels
- Background music
- Spatial audio for the sound fx
- Bonus levels for supporters using Coil/Webmonetization
- More particle fx
- more features of the puzzles, like teleporting the boxes, portals and gravity fx.
- Better lighting and lighting FX
- More efficient way of rendering the cubes, using UVs to select the textures. 

### Tools used
- [PlayCanvas](https://playcanvas.com/) Engine
- VSCode
- [Pyxel Edit](https://www.pyxeledit.com/) for creating pixel art
- Gulp for the build pipeline
- Unity3D for designing the levels with a very basic 'exporter' to create the JSON needed for the game
- Microsoft Edge for debugging local and remote
- Roadroller for compressing the JavaScript as much as possible
- AdvZip for creating the zip file





