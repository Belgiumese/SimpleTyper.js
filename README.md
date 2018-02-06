# SimpleTyper.js
A simple plugin that adds a typewriter effect to any text, giving it the appearance of being typed onto
the page.

**Requirements:** jQuery 1.4+

## Features
* Lightweight (3KB) and efficient
* Realistic typing effect with randomisation options
* Blinking cursor effect, customisable through CSS with `.simpleTyperCursor`
* Optional advanced customisation options

## Usage
Simply add a `simpleTyper` class to any element, and the text to be typed as a `data-typer-text` html attribute.

**HTML:**
```html
<p id="example" class="simpleTyper" data-typer-text="Hello World!"></p>
```

**JS:**
```js
simpleTyper.init().start($('#example')[0]);
```

* simpleTyper.init(): Initialise the plugin
* simpleTyper.start(*element*): Start the typing effect on this non-jQuery element.
* simpleTyper.stop(*element*): Force the effect to stop on this non-jQuery element. Note: the effect 
                               stops automatically upon completion.
* simpleTyper.startAll(): This will start the typing animation on every applicable element.
* simpleTyper.settings(*settings*): override default settings with an `object` (see below for detail).

## Settings
These can be passed in as a object to `simpleTyper.settings()`, or applied directly to an element by adding
`data-typer-{your-property}="{your-value}"`.

### speed
Type: `Number` (ms), Default: `1000`
How long it will take for a letter to be typed. 

### delay
Type: `Number` (ms), Default: `0`
A delay between when `simpleTyper.start()` is called and when the animation begins.

### random
Type: `Number` (fraction), Default: `0.1`
A multiplier (0 to 1) which randomly shifts the `speed` attribute. This adds realism to the animation.

### cursorSpeed
Type: `Number` (ms), Default: `500`
How fast the cursor blinks. Note: cursor must be implemented in CSS using `.simpleTyperCursor`.

### cursorStopDelay
Type: `Number` (ms), Default: `1000`
How long the cursor continues to blink for after the typing animation has finished.

## Examples
### Basic example:
[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

