import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'SR', width: 70, align:"center",
    headerAlign:"center" },
    { field: 'Question', headerName: 'Question', width: 850 },
   
    {
      field: 'TimeStamp',
      headerName: 'Timestamp',
      type: 'number',
      width: 250,
      align:"center",
      headerAlign:"center"
    },
    {
      field: 'asked_by',
      headerName: 'Asked By',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      align:"center",
      headerAlign:"center"
    },
  ];


  const rows = [
    { id: 1, Question: 'Give difference between .NET framework and .NET core.', TimeStamp: 56, asked_by : 'vivek' },
    { id: 2, Question: 'When to use REST api and when to use SOAP services in real time application ?', TimeStamp: 42, asked_by : 'vivek'  },
    { id: 3,  Question: 'Is DSA complarsory to crack placement in IT company', TimeStamp: 45, asked_by : 'vivek' },
    { id: 4,  Question: 'Error: react-router-dom module not found.', TimeStamp: 16, asked_by : 'vivek'  },
    { id: 5, Question: 'Not able to manage Bootstrap components by extending base.html in Django', TimeStamp: 88, asked_by : 'vivek'  },
    { id: 6, Question: 'How to use for-loops, if-else statements, and regex to iteratively run a software on command line', TimeStamp: 150, asked_by : 'vivek'  },
    { id: 7, Question: "Why am I getting an AXUIElementCopyAttributeValue error while trying to get a TextArea's content in MS Word using Swift?", TimeStamp: 44, asked_by : 'vivek'  },
    { id: 8, Question: 'How to properly register MemoryCache with IoC Container?', TimeStamp: 36, asked_by : 'vivek'  },
    { id: 9, Question: 'How can I have a bad Time to First Byte on Core Web Vitals, but a good TTFB on all Pagespeed tests?  ', TimeStamp: 65, asked_by : 'vivek'  },
  ];

const QuestionList = () => {
    return (
        <>
            <div style={{  width: '100%' }} className='bg-primary-white'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    }}
                    pageSizeOptions={[10, 20, 50]}
                    
                />
            </div>
        </>
    );
}

export default QuestionList;