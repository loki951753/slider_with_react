export default (id = 0, params='')=>(
  {
    id: `m_${id}`,
    type: 'text',
    class: params.className ? params.className : '',
    // attr: {},
    html: `
      <div style="display:block;
                  z-index: ${id * 10};
                  width:100px;
                  position: absolute;
                  top:0px;
                  left:0px;
                  font-size:1em;
                  box-sizing:border-box;
                  width:100%;
                  height:100%;
                  box-sizing:border-box;
                  background-color: rgba(0,0,0,0);
                  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0);
                  color:#1a1a1a;
                  line-height:1.5;
                  padding:5px;">
        文本文本文本
      </div>
    `
  }
)
