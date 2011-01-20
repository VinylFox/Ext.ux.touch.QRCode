/**
 * Simple QRCode component that fetches a QR Code image from googles chart api
 *
 * @author Shea Frederick - http://www.vinylfox.com
 */
Ext.ux.touch.QRCode = Ext.extend(Ext.Component,  {
    baseCls: 'x-qrcode',
    renderSelectors: {
        qrcode: 'img.x-qrcode'
    },
    imgsize: '350',
    autoSize: false,
    secure: false,
    encoding: 'UTF-8',
    renderTpl: [
        '<img src="http{secure}://chart.googleapis.com/chart?chs={imgsize}x{imgsize}&cht=qr&chl={qrcode}&choe={encoding}" class="{baseCls}">'
    ],

    initRenderData: function() {
        this.renderData = {
            secure   : (this.secure === true)?'s':'',
            imgsize  : this.getQRSize(),
            encoding : this.encoding,
            baseCls  : this.baseCls,
            qrcode   : this.value || ''
        };
        
        return this.renderData;
    },

    getQRSize: function(){
        var size = (this.autoSize)?this.ownerCt.getSize().width:this.imgsize;
        //limit of 300000 pixels from the google chart api 
        if (size > 547){ size = 547; }
        return size;
    },

    setValue: function(value){
        this.value = value;

        if (this.rendered && this.qrcode) {
            this.proto.renderTpl.overwrite(this.el.dom, this.initRenderData());
        }

        return this;
    }
});

Ext.reg('qrcode', Ext.ux.touch.QRCode);
