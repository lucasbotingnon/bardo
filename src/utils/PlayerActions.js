// Utility functions that encapsulate common queue manipulations, allowing both
// slash-commands and component interactions to share the same core logic.

/**
 * Plays the previous track in the queue if available.
 * Returns the track that started playing, or null if none.
 */
async function playPrevious(player) {
    if (!player.queue.previous || player.queue.previous.length === 0) {
        return null;
    }

    // Remove the previous track from the history
    const previousTrack = await player.queue.shiftPrevious();
    if (!previousTrack) {
        return null;
    }

    // Put current track back to the front of the queue (so we can return to it)
    if (player.queue.current) {
        await player.queue.add(player.queue.current, 0);
    }

    // Mark the track so it's not re-added to previous again
    const previousClientData = previousTrack.pluginInfo?.clientData || {};
    previousTrack.pluginInfo = previousTrack.pluginInfo || {};
    previousTrack.pluginInfo.clientData = {
        previousTrack: true,
        ...previousClientData,
    };

    // Start playing
    await player.play({ clientTrack: previousTrack });
    return previousTrack;
}

function shuffleQueue(player) {
    player.queue.shuffle();
}

function clearQueue(player) {
    const len = player.queue.tracks.length;
    player.queue.tracks.splice(0, len);
}

function formattedQueue(player, limit = 10) {
    if (!player.queue.tracks.length) return '';
    const list = player.queue.tracks
        .slice(0, limit)
        .map((track, i) => `${i + 1}. ${track.info?.title || 'Unknown'}`)
        .join('\n');
    const remaining = player.queue.tracks.length - limit;
    return remaining > 0 ? `${list}\n…and ${remaining} more` : list;
}

module.exports = {
    playPrevious,
    shuffleQueue,
    clearQueue,
    formattedQueue,
}; 