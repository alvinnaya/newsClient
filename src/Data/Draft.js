export const Draft = {
    post: [
      {
        BlogId : 0,
        HeadLine: '',
        BlogContents:[
      {
        page : '1',
        components:[
          {
            name : 'HeadingText',
            contents: 'Judul Headline',
            style : {
             colStart: '2',
             colEnd : '10',
             rowStart: '2',
             rowEnd : '5',
            },
            zIndex: 1, 
           },
           {
            name : 'ImageContainer',
            contents: 'Type text',
            style : {
              colStart: '2',
              colEnd : '10',
              rowStart: '5',
              rowEnd : '11',
              borderRadius: 1.5,
            },
            zIndex: 2,
           }
         
        ]
       },
        {
         page : '1',
         components:[{
          name : 'Text',
          contents: 'Itali merupakan tempat yang sempurna bagi wisatawan yang ingin merasakan keindahan alam, yang dimana bla bla bla and then',
          style : {
           colStart: '2',
           colEnd : '10',
           rowStart: '2',
           rowEnd : '4',
          },
          zIndex: 1,
          
         },{
           name : 'Text',
           contents: 'Itali merupakan tempat  Italia adalah negara yang menawarkan.',
           style: 'col-start-2 col-span-8 row-start-5 row-span-3',
           style : {
             colStart: '2',
             colEnd : '10',
             rowStart: '5',
             rowEnd : '8',
           },
           zIndex: 1,
           
          },]
        },
        {
         page : '2',
         components:[{
          name : 'Text',
          contents: 'Sopan',
          style : {
           colStart: '3',
           colEnd : '10',
           rowStart: '8',
           rowEnd : '10',
          },
          zIndex: 1,
         }]
        },
        {
         page : '3',
         components:[{
          name : 'Text',
          contents: 'Sopan',
          style : {
           colStart: '2',
           colEnd : '10',
           rowStart: '2',
           rowEnd : '5',
          },
          zIndex: 1,
         }]
        }
        
       ]}
      ]
}