export default {
  type: "object",
  name: "postAuthor",
  title: "Post author",
  fields: [
    {
      title: "Person",
      name: "person",
      type: "reference",
      to: { type: "person" }
    }
  ],
  preview: {
    select: {
      personName: "person.name",
      image: "person.image"
    },
    prepare(data) {
      return {
        ...data,
        title: data.personName,
        media: data.image
      };
    }
  }
};
