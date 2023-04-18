import React, { useState, createContext, useEffect } from "react";

export const LearnContext = createContext();

const data = [
  {
    _id: "1563435165",
    name: "Tutorial: Build a decentralized linktree profile",
    discription: `<p>In this workshop, we will learn how to build a decentralized frontend on <a href="https://near.org/blog/near-announces-the-blockchain-operating-system/">Blockchain Operating System</a>. We will create <a href="https://linktr.ee/">linktree</a> clone for our profile. \n \n At the end we will have a working decentralized profile deployed on-chain in near protocol.</p>`,
    sections: [
      {
        _id: "1",
        name: "Step 1: Setting up development environment",
        discription: `<p class="has-line-data" data-line-start="0" data-line-end="1">We will build a decentralized fronent on BOS using <code>nearpad</code> devtool. <code>nearpad</code> is a cloud IDE so we don’t have to install anything in our local machine. However, to save frontend code in NEAR blockchain we will need a NEAR wallet.</p>
        <p class="has-line-data" data-line-start="2" data-line-end="3">For our workshop we will use Testnet. You can create a wallet in testnet from <a href="https://testnet.mynearwallet.com/">here</a>.</p>
        <p class="has-line-data" data-line-start="4" data-line-end="5">You can signin to <a href="https://nearpad.dev">nearpad</a> using your github profile.</p>
        <p class="has-line-data" data-line-start="6" data-line-end="7">After you login to <code>nearpad</code> you will see the below code in the code editor.</p>
        <pre><code class="has-line-data" data-line-start="9" data-line-end="11">return &lt;div&gt;Hello World&lt;/div&gt;; 
        </code></pre>
        <p class="has-line-data" data-line-start="11" data-line-end="12">Let’s make sure everything is working by updating the <code>Hello World</code> text to <code>Hello [your name]</code> and you should see <code>Hello [your name]</code> in the Preview.</p>`,

        code: "return <div>Hello World</div>;",
      },
      {
        _id: "2",
        name: "Step 2: What we will build",
        discription: `
        <p class="has-line-data" data-line-start="0" data-line-end="1">What we will build:</p>
<pre><code class="has-line-data" data-line-start="3" data-line-end="90">const profile = {
  avatar:
    &quot;https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80&quot;,
  name: &quot;John Doe&quot;,
  title: &quot;jack of all trades&quot;,
  links: [
    { title: &quot;github&quot;, url: &quot;https://github.com/zahid-dev&quot; },
    { title: &quot;twitter&quot;, url: &quot;https://twitter.com/zahid-dev&quot; },
  ],
  socials: [
    { title: &quot;github&quot;, url: &quot;https://github.com/zahid-dev&quot; },
    { title: &quot;twitter&quot;, url: &quot;https://twitter.com/zahid-dev&quot; },
  ],
};

const socials = {
  github: &lt;i class=&quot;bi bi-github&quot;&gt;&lt;/i&gt;,
  twitter: &lt;i class=&quot;bi bi-twitter&quot;&gt;&lt;/i&gt;,
  facebook: &lt;i class=&quot;bi bi-facebook&quot;&gt;&lt;/i&gt;,
  whatsapp: &lt;i class=&quot;bi bi-whatsapp&quot;&gt;&lt;/i&gt;,
  linkedin: &lt;i class=&quot;bi bi-linkedin&quot;&gt;&lt;/i&gt;,
};

return (
  &lt;div
    style={{
      display: &quot;flex&quot;,
      flexDirection: &quot;column&quot;,
      justifyContent: &quot;center&quot;,
      alignItems: &quot;center&quot;,
      gap: 16,
      height: &quot;100%&quot;,
      padding: &quot;0 8px&quot;,
    }}
  &gt;
    &lt;img
      style={{
        height: &quot;100%&quot;,
        maxHeight: 200,
        borderRadius: &quot;50%&quot;,
        aspectRatio: 1 / 1,
        objectFit: &quot;cover&quot;,
      }}
      src={
        profile.avatar ??
        &quot;https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541&quot;
      }
      alt={profile.name}
    /&gt;

    &lt;div
      style={{
        display: &quot;flex&quot;,
        flexDirection: &quot;column&quot;,
        alignItems: &quot;center&quot;,
      }}
    &gt;
      &lt;h2 style={{ color: props.theme.textColor }}&gt;{profile.name}&lt;/h2&gt;
      &lt;h5 style={{ color: props.theme.textColor2 }}&gt;{profile.title}&lt;/h5&gt;
    &lt;/div&gt;
    &lt;div
      style={{
        display: &quot;flex&quot;,
        flexDirection: &quot;column&quot;,
        gap: 8,
        width: &quot;100%&quot;,
        maxWidth: 400,
      }}
    &gt;
      {profile.links?.map((link) =&gt; (
        &lt;a href={link.url} target=&quot;_blank&quot;&gt;
          &lt;button style={{ width: &quot;100%&quot; }}&gt;{link.title}&lt;/button&gt;
        &lt;/a&gt;
      ))}
    &lt;/div&gt;

    &lt;div style={{ display: &quot;flex&quot;, gap: 16 }}&gt;
      {profile.socials?.map((link) =&gt; (
        &lt;a href={link.url} target=&quot;_blank&quot; style={{ fontSize: &quot;1.5rem&quot; }}&gt;
          {socials[link?.title]}
        &lt;/a&gt;
      ))}
    &lt;/div&gt;
  &lt;/div&gt;
);

</code></pre>
        `,
        code: `
        const profile = {
          avatar:
            "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          name: "John Doe",
          title: "jack of all trades",
          links: [
            { title: "github", url: "https://github.com/zahid-dev" },
            { title: "twitter", url: "https://twitter.com/zahid-dev" },
          ],
          socials: [
            { title: "github", url: "https://github.com/zahid-dev" },
            { title: "twitter", url: "https://twitter.com/zahid-dev" },
          ],
        };
        
        const socials = {
          github: <i class="bi bi-github"></i>,
          twitter: <i class="bi bi-twitter"></i>,
          facebook: <i class="bi bi-facebook"></i>,
          whatsapp: <i class="bi bi-whatsapp"></i>,
          linkedin: <i class="bi bi-linkedin"></i>,
        };
        
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              height: "100%",
              padding: "0 8px",
            }}
          >
            <img
              style={{
                height: "100%",
                maxHeight: 200,
                borderRadius: "50%",
                aspectRatio: 1 / 1,
                objectFit: "cover",
              }}
              src={
                profile.avatar ??
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
              alt={profile.name}
            />
        
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: props.theme.textColor }}>{profile.name}</h2>
              <h5 style={{ color: props.theme.textColor2 }}>{profile.title}</h5>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                width: "100%",
                maxWidth: 400,
              }}
            >
              {profile.links?.map((link) => (
                <a href={link.url} target="_blank">
                  <button style={{ width: "100%" }}>{link.title}</button>
                </a>
              ))}
            </div>
        
            <div style={{ display: "flex", gap: 16 }}>
              {profile.socials?.map((link) => (
                <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
                  {socials[link?.title]}
                </a>
              ))}
            </div>
          </div>
        );
        
        `,
      },
      {
        _id: "3",
        name: "Step 3: Create first decentralized component",
        discription: `
        <p class="has-line-data" data-line-start="0" data-line-end="1">Let’s build our first component where we want to show the name and title.</p>
<pre><code class="has-line-data" data-line-start="3" data-line-end="12">return (
  &lt;div&gt;
    &lt;div&gt;
      &lt;h2&gt;John Doe&lt;/h2&gt;
      &lt;h5&gt;jack of all treads&lt;/h5&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);
</code></pre>
<p class="has-line-data" data-line-start="13" data-line-end="14">We should see <code>John Doe</code> and <code>jack of all treads</code> in the preview.</p>
<p class="has-line-data" data-line-start="15" data-line-end="16">Let’s improve the <code>style</code>. We can use in-line <code>style</code> in BOS components. If we want to center the name and tile in the page here is the css code:</p>
<pre><code class="has-line-data" data-line-start="18" data-line-end="22">display: &quot;flex&quot;;
flex-direction: &quot;column&quot;;
align-items: &quot;center&quot;;
</code></pre>
<p class="has-line-data" data-line-start="23" data-line-end="24">Now we can update our component with the style:</p>
<pre><code class="has-line-data" data-line-start="26" data-line-end="41">return (
  &lt;div&gt;
    &lt;div
      style={{
        display: &quot;flex&quot;,
        flexDirection: &quot;column&quot;,
        alignItems: &quot;center&quot;,
      }}
    &gt;
      &lt;h2&gt;John Doe&lt;/h2&gt;
      &lt;h5&gt;jack of all treads&lt;/h5&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);
</code></pre>
<blockquote>
<p class="has-line-data" data-line-start="42" data-line-end="43">Bonus: if you want to support <code>light</code> and <code>dark</code> theme in the component you can use the theme provided by the platform</p>
</blockquote>
<p class="has-line-data" data-line-start="44" data-line-end="45">Here is the full code:</p>
<pre><code class="has-line-data" data-line-start="46" data-line-end="61">return (
  &lt;div&gt;
    &lt;div
      style={{
        display: &quot;flex&quot;,
        flexDirection: &quot;column&quot;,
        alignItems: &quot;center&quot;,
      }}
    &gt;
      &lt;h2 style={{ color: props.theme.textColor }}&gt;John Doe&lt;/h2&gt;
      &lt;h5 style={{ color: props.theme.textColor2 }}&gt;jack of all treads&lt;/h5&gt;
    &lt;/div&gt;
  &lt;/div&gt;
);
</code></pre>
        `,
        code: `return (
          <div>
            <div>
              <h2>John Doe</h2>
              <h5>jack of all treads</h5>
            </div>
          </div>
        );`,
      },
      {
        _id: "4",
        name: "Step 4: Create more advance component",
        discription: `
        <p class="has-line-data" data-line-start="0" data-line-end="1">Let’s create more advance component which will display a list of links/buttons in our profile.</p>
<pre><code class="has-line-data" data-line-start="3" data-line-end="27">const links = [
  { title: &quot;Link 1&quot;, url: &quot;#&quot; },
  { title: &quot;Link 2&quot;, url: &quot;#&quot; },
  { title: &quot;Link 3&quot;, url: &quot;#&quot; },
];

return (
  &lt;div&gt;
    {links.map((link) =&gt; (
      &lt;a href={link.url} target=&quot;_blank&quot;&gt;
        &lt;button style={{ width: &quot;100%&quot; }}&gt;{link.title}&lt;/button&gt;
      &lt;/a&gt;
    ))}
  &lt;/div&gt;
);
</code></pre>
<p class="has-line-data" data-line-start="28" data-line-end="29">Now let’s add <code>style</code> in our component. However, this time we will use <a href="https://styled-components.com/"><code>styled</code> component</a> instead of in-line css.</p>
<pre><code class="has-line-data" data-line-start="31" data-line-end="55">const links = [
  { title: &quot;Link 1&quot;, url: &quot;#&quot; },
  { title: &quot;Link 2&quot;, url: &quot;#&quot; },
  { title: &quot;Link 3&quot;, url: &quot;#&quot; },
];

const Links = styled.div\`
display: flex;
flex-direction: column;
gap: 8px;
width: 100%;
maxWidth: 400px;
\`;

return (
  &lt;Links&gt;
    {links.map((link) =&gt; (
      &lt;a href={link.url} target=&quot;_blank&quot;&gt;
        &lt;button style={{ width: &quot;100%&quot; }}&gt;{link.title}&lt;/button&gt;
      &lt;/a&gt;
    ))}
  &lt;/Links&gt;
);
</code></pre>
        `,
        code: `
        const links = [
          { title: "Link 1", url: "#" },
          { title: "Link 2", url: "#" },
          { title: "Link 3", url: "#" },
        ];
        
        return (
          <div>
            {links.map((link) => (
              <a href={link.url} target="_blank">
                <button style={{ width: "100%" }}>{link.title}</button>
              </a>
            ))}
          </div>
        );
        `,
      },
      {
        _id: "5",
        name: "Step 5: Reading data from NEAR Social contract",
        discription: ``,
        code: `//TODO:`,
      },
      {
        _id: "6",
        name: "Step 6: Reading data from external API",
        discription: ``,
        code: `//TODO:`,
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
