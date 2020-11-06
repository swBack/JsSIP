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
    this.emit('MobileSocketEvent', 'opened');
  }  

  _onClose({ wasClean, code, reason })
  { 
    const message = { 'wasClean': wasClean, 'code': code, 'reason': reason };
    
    this.emit('MobileSocketEvent', 'closed', message);
  }

  _onError(e)
  {
    this.emit('MobileSocketEvent', 'SocketError', { 'error': e });
  }
  
  _onMessage({ data })
  {
    this.emit('MobileSocketEvent', 'onMessages', { 'data': data });
  }

  connect()
  {
    this.emit('MobileSocketEvent', 'connecting');
  }

  disconnect()
  {
    this.emit('socketDisconnected', 'disconnecting');
  }

  send(message)
  {
    this.emit('socketDisconnected', 'sendMessage', message);
    
  }
};