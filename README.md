node.chvt
============

Provides a way to change the VT under Linux in an easy fashon.


Disclaimer
----------

- I'm an absolute newbie to node, node-gyp and npm, so this may be full of flaws. Feel invited to provide pull requests...

- I use int32s since I want to be able to use this for all kinds of ioctls.
- I provide no callback, since I don't provide an async function, so no need.
- Return values can carry return values on some ioctls, not just errors.

Dependencies
------------

Requires LLioctl from the node.LLioctl repository.

Building
--------

Just get npm and run:
npm install

