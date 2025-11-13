import { defineField, defineType } from 'sanity';
import { AutoFilledSlugInput } from '../components/autoFilledSlugInput';
import { RequiredSkillModuleTagListInput } from '../components/moduleTagListInput';

export const requiredSkillType = defineType({
  name: 'required_skill',
  title: 'Required Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'stage',
      title: 'Stage',
      description: 'Which stage the skill is categorized in',
      type: 'string',
      options: {
        list: [
          { title: 'Fundamentals', value: 'Fundamentals' },
          { title: 'Controlled Gameplay', value: 'Controlled Gameplay' },
          { title: 'Full Gameplay', value: 'Full Gameplay' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Used as unique identifier in URL; auto-filled from Title',
      type: 'slug',
      readOnly: true,
      components: {
        input: AutoFilledSlugInput(
            'title',
            (source: string) => source.toLowerCase().replaceAll(' ', '-')
        ),
      },
    }),
    defineField({
      name: 'importance',
      title: 'Why the skill is important',
      type: 'string',
    }),
    defineField({
      name: 'key_points',
      title: 'Key focus points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'module_tag',
      title: 'Tag for related modules',
      description: 'Tag for recommended related modules',
      type: 'reference',
      to: [{ type: 'module_tag' }],
      options: {
        disableNew: true,
      },
      components: {
        input: RequiredSkillModuleTagListInput,
      },
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      description: 'Used by Orderable Document List plugin, do not modify',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      stage: 'stage',
      title: 'title',
    },
    prepare(value: Record<string, any>) {
      const { stage, title } = value;
      return {
        title,
        subtitle: stage,
      };
    },
  },
});
