import TreeImg from "../../../assets/Images/TreeImg.jpg";
import TreePreservation from "../../../assets/Images/TreePreservation.jpg";
import SingleTree from "../../../assets/Images/SingleTree.png";
import VeteranTreeImg from "../../../assets/Images/VeteranTreeImg.png";

export const TreePreservationData = {
  title: "A guide to Tree Preservation Orders",
  service: "Tree Surgery",
  imgSrc: TreePreservation,
  description: `Trees can be protected in different ways depending on age, size, location and risk of development. Whether you’re interested in an unusual tree, concerned about one where you live, or checking restrictions before starting building work, our simple guide covers the essentials. Discover the different methods of protection, how to check what’s already in place and what you can do to protect trees that are important to you.`,
  treeImg: SingleTree,

  sections: [
    {
      title: "Types of tree protection",
      subtitle: "Tree Preservation Orders (TPO)",
      content1: `These orders are made and managed by local authorities. They protect individual trees, groups of trees or woods that are of particular value to local communities.`,
      content2:
        "TPOs prohibit felling and damage to trees without the written consent of the local planning authority. They are no longer valid if removing the tree is part of an approved planning application.",
      extra: "Conservation Areas",
      extraContent1: `Conservation Areas protect places of historic and architectural value. These are also designated by local planning authorities. Removing trees in a Conservation Area requires permission from the relevant authority, subject to certain exclusions.`,
      extraContent2:
        "Before any work begins, a tree surgeon assesses the overall health and stability of your trees. They’re trained to spot early signs of disease, pest infestations, cracks, or hidden rot that most of us would overlook.",
    },
    {
      subtitle: "Planning Policies",
      content1: `Trees and woods are recognised in planning policies throughout the UK for their benefits to people and nature. Planning applications should include details of any trees affected by the proposed development. All trees should be evaluated by an arboricultural consultant according to the current British Standard BS5837 (2012). This aims to reduce the impact of development on trees.`,
      content2:
        "Even if a planning application doesn’t indicate tree removal, any trees being kept should adhere to the British Standard. This includes adequate above-ground spacing and root protection.",
      extraImage: VeteranTreeImg,
      extra: "Veteran and ancient trees and woods",
      extraContent1: `Ancient woodland and ancient and veteran trees need special considerations. In 2018, the Trust successfully lobbied the Government to change English policy so that development affecting these habitats can only go ahead in wholly exceptional circumstances.`,
      extraContent2:
        "In England and Wales, planning policy instructs developers to consult the Ancient Tree Inventory. This prompts them to reduce the impact of development on any ancient or veteran trees.",
      extraContent3:
        "Proposals involving ancient trees and woods will often need to go beyond the current British Standard to avoid harm, particularly around root protection area.",
    },
    {
      subtitle: "5. Planting & conservation",
      content: `Tree surgeons don’t just remove trees. They help plant them too. They can recommend the right species for your soil, plant them correctly and even transplant existing trees when needed.`,
    },
    {
      subtitle: "6. Disease & pest management",
      content: `Trees can suffer from pests, fungi, and decay. Tree surgeons identify these problems early and recommend treatments or interventions to prevent further spread.`,
    },
    {
      subtitle: "7. Emergency response",
      content: `Storm damage or fallen branches can pose immediate risks. Tree surgeons are often called out in emergencies to make trees safe, clear debris, and restore access quickly.`,
    },
    {
      subtitle: "8. Surveys & reports",
      content: `For planning applications, insurance, or legal compliance, a tree surgeon (or arborist) can provide formal surveys and written reports to assess safety, preservation needs, or risks.`,
    },
  ],

  additionalInfo: [
    {
      title: "How to remove a tree stump",
      imgSrc: TreeImg,
    },
    {
      title: "How to tell if a tree is dying",
      imgSrc: TreeImg,
    },
    {
      title: "Other blog topics",
      imgSrc: TreeImg,
    },
  ],
};
