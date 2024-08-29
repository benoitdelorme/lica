/**
 * FPS Meter with Stats.js
 *
 * Provides perfomances statistics
 *
 * - `Control + s` to toggle the stats
 *
 */

import { $body } from '@/utils/dom'
import Tempus from '@darkroom.engineering/tempus'
import Stats from 'stats.js'

let updater
let stats

export function statsMeter() {
  setStatsMeter()
  setStatsEvents()
}

function setStatsMeter() {
  stats = new Stats()
  stats.showPanel( 0 )
  stats.domElement.style.left = `initial`
  stats.domElement.style.right = `0`
  stats.domElement.style.visibility = `hidden`
  
  $body.appendChild( stats.dom )
}

function startStatsMeter() {
  updater = Tempus.add((time) => {
    update()
  }, 0)
}

function stopStatsMeter() {
  updater()
}

function update() {
	stats.update()
}

function setStatsEvents() {
    // Toggle Stats
    let ctrlDown = false;
    let isActive = false;

    document.addEventListener('keydown', (e) => {
        if (e.key == 'Control') {
            ctrlDown = true
        } else {
            if (ctrlDown && e.key == 's') {
                if (isActive) {
                  stats.domElement.style.visibility = 'hidden'
                  stopStatsMeter()
                } else {
                  stats.domElement.style.visibility = 'visible'
                  startStatsMeter()
                }

                isActive = !isActive
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key == 'Control') {
            ctrlDown = false
        }
    });
}