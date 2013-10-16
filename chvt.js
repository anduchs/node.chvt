/**
 * Copyright 2013, Andreas Fuchs
 * 
 * Get or change the current VT via ioctls VT_GETSTATE and VT_ACTIVATE on /dev/tty0 (needs sudo previledges)
 * 
 * VT_GETSTATE's payload:
 * struct vt_stat {
 *     ushort v_active;
 *     ushort v_signal;
 *     ushort v_state;
 * };
 * 
 * VT_ACTIVATE just takes a int...
 * 
 * TODOs:
 * - Add activateNotify with callback, cycledelay, and timeout
 * - Or add this to activate directly ?
 * - Add other cool stuff from this family of ioctls...
 * 
 **/

var fs = require('fs');
var LLioctl = require('LLioctl');

var VT_GETSTATE = 0x5603;
var VT_ACTIVATE = 0x5606;

exports.get_active = function() {
    fd = fs.openSync('/dev/tty0', 'r');
    vt_stat = new Uint16Array(3);
    r = LLioctl(fd, VT_GETSTATE, vt_stat.buffer);
    fs.closeSync(fd);
    if (r != 0)
        throw new Error('IOCTL error: '+r);
    return vt_stat[0];
}

exports.activate = function(vt) {
    fd = fs.openSync('/dev/tty0', 'r');
    r = LLioctl(fd, VT_ACTIVATE, vt);
    fs.closeSync(fd);
    if (r != 0)
        throw new Error('IOCTL error: '+r);
}    

var test = function() {
    chvt = require("./chvt.js");
    current = chvt.get_active();
    setTimeout(function() {chvt.activate(1);}, 1000);
    setTimeout(function() {chvt.activate(2);}, 5500);
    setTimeout(function() {chvt.activate(current);}, 10000);
}
    
