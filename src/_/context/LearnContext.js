import React, { useState, createContext, useEffect } from "react";

export const LearnContext = createContext();

const data = [
  {
    _id: "1563435165",
    name: "Project 1",
    discription:
      "Sunt ex aliqua nisi tempor ullamco consequat minim incididunt adipisicing exercitation duis. Commodo eiusmod est qui est culpa. Commodo qui excepteur magna exercitation in laborum in duis. Mollit labore anim irure nisi officia enim ad.",
    sections: [
      {
        _id: "5456123",
        name: "Section 1",
        discription: `# My 2222 Awesome Heading 2 \n This is some **bold** and *italic* text. \n Here's a list: \n - Item 1 \n - Item 5 \n - Item 8 \n > Here's a blockquote. \n And here's a link to [Google](https://www.facebook.com/).`,

        code: "return (<div>\n \n \n<h1>Learn</h1></div>)",
      },
      {
        _id: "85563",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
    ],
  },
  {
    _id: "564676787",
    name: "Project 2",
    discription:
      "Sunt ex aliqua nisi tempor ullamco consequat minim incididunt adipisicing exercitation duis. Commodo eiusmod est qui est culpa. Commodo qui excepteur magna exercitation in laborum in duis. Mollit labore anim irure nisi officia enim ad.",
    sections: [
      {
        _id: "5456123",
        name: "Section 1",
        discription: `# My Awesome Heading
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 2
          - Item 3
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.google.com/).`,
        code: "return (<div>\n \n \n<h1>Learn</h1></div>)",
      },
      {
        _id: "85563",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
    ],
  },
  {
    _id: "1569789789",
    name: "Project 3",
    discription: `# My Awesome Heading 2 \n This is some **bold** and *italic* text. \n Here's a list: \n - Item 1 \n - Item 5 \n - Item 8 \n > Here's a blockquote. \n And here's a link to [Google](https://www.facebook.com/).`,
    sections: [
      {
        _id: "5456123",
        name: "Section 1",
        discription: `# My Awesome Heading
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 2
          - Item 3
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.google.com/).`,
        code: "return (<div>\n \n \n<h1>Learn</h1></div>)",
      },
      {
        _id: "855ertyerty63",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "adssasderw",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "8cvnb5563",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "wert85563",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "85jk;l563",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "855gkhj63",
        name: "Section 2",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "855dfgh63",
        name: "Section 3",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
      {
        _id: "855fsd63",
        name: "Section 4",
        discription: `# My Awesome Heading 2
  
          This is some **bold** and *italic* text.
          
          Here's a list:
          - Item 1
          - Item 5
          - Item 8
          
          > Here's a blockquote.
          
          And here's a link to [Google](https://www.facebook.com/).`,
        code: "return (<div>\n \n \n<h1>Facebook</h1></div>)",
      },
    ],
  },
];

export const LearnContextProvider = (props) => {
  const [projects, setProjects] = useState(data);

  const [showProjectbar, setShowProjectbar] = useState(false);

  const [selectedItem, setSelectedItem] = useState({
    projectId: "",
    sectionId: "",
  });

  const [selectedProject, setSelectedProject] = useState();
  const [selectedSection, setSelectedSection] = useState();

  useEffect(() => {
    loadSelectedProject();
  }, []);
  const loadSelectedProject = async () => {
    let data = await localStorage.getItem("selectedProject");
    setSelectedItem(JSON.parse(data));
  };

  useEffect(() => {
    if (selectedItem?.projectId) {
      setSelectedProject(
        projects?.find((p) => p?._id === selectedItem.projectId)
      );
    }
    if (selectedItem?.sectionId && selectedProject) {
      setSelectedSection(
        selectedProject?.sections?.find(
          (s) => s?._id === selectedItem.sectionId
        )
      );
    }
  }, [selectedItem, selectedProject]);

  const goBack = () => {
    let state = {
      projectId: "",
      sectionId: "",
    };

    setSelectedProject({});
    setSelectedSection({});

    setSelectedItem(state);
    localStorage.setItem("selectedProject", JSON.stringify(state));
  };

  return (
    <LearnContext.Provider
      value={{
        projects,
        setProjects,
        showProjectbar,
        setShowProjectbar,
        selectedItem,
        setSelectedItem,
        //
        selectedProject,
        setSelectedProject,
        selectedSection,
        setSelectedSection,
        //
        goBack,
      }}
    >
      {props.children}
    </LearnContext.Provider>
  );
};

export default LearnContextProvider;
