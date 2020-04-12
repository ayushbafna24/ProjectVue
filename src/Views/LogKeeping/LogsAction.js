
    const CommandCell = {
    props: {
        field: String,
        dataItem: Object,
        format: String,
        className: String,
        columnIndex: Number,
        columnsCount: Number,
        rowType: String,
        level: Number,
        expanded: Boolean,
        editor: String
    },
    template: ` <td>
                    <button
                        class="k-primary k-button k-grid-edit-command"
                        @click="editHandler">
                        Edit
                    </button>
                    <button
                        class="k-button k-grid-remove-command"
                        @click="removeHandler">
                        Remove
                    </button>
                </td>`,
    methods: {
        editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
        },
        removeHandler: function() {
            this.$emit('remove', {dataItem:this.dataItem});
        },
        addUpdateHandler: function() {
            this.$emit('save', {dataItem:this.dataItem});
        },
        cancelDiscardHandler: function() {
            this.$emit('cancel', {dataItem:this.dataItem});
        }
    }
}
export default CommandCell;

