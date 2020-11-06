// const debug = require('debug')('JsSIP:WebSocketInterface');
const debugerror = require('debug')('JsSIP:ERROR:WebSocketInterface');
const Utils = require('./Utils');
const EventEmitter = require('events').EventEmitter;

debugerror.log = console.warn.bind(console);

module.exports = class WebSocketMobileHandler extends EventEmitter
{
    
  constructor(options = {})
  {
    super();

    const eventHandlers = Utils.cloneObject(options.socketHandlers);

    for (const event in eventHandlers)
    {    
      if (Object.prototype.hasOwnProperty.call(eventHandlers, event))
      {
        this.on(event, eventHandlers[event]);
      }
    }
  }

  _onOpen()
  {
    this.emit('socketOpened');
  }  

  _onClose({ wasClean, code, reason })
  { 
    const message = { 'wasClean': wasClean, 'code': code, 'reason': reason };
    
    this.emit('socketClosed', message);
  }

  _onError(e)
  {
    this.emit('socketError', { 'error': e });
  }
  
  _onMessage({ data })
  {
    this.emit('onMessages', { 'data': data });
  }

  connect()
  {
    this.emit('socketConnected');
  }

  disconnect()
  {
    this.emit('socketDisconnected');
  }

  send(message)
  {
    this.emit('sendMessage', message);
    
  }
};